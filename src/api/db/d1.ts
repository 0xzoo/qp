import { D1Database } from '@cloudflare/workers-types'
import {
  DirectQ,
  Q,
  // QEntry,
  User,
  // Q,
} from './types.js'
import { getFarcasterUserProfile } from '../airstack/hub.js'
// import { Env } from '../../index.js'


export async function createUser(fid: number, db: D1Database) {
  try {
    if (fid < 1) throw new Error('Invalid ID')
    const { profileName, error } = await getFarcasterUserProfile(fid)
    if (error) console.log('error getting profileName', error)
    // const timestamp = Date.now()
    const stmt = `INSERT INTO Users (fid, fname, points_balance, points_allowance) VALUES (?, ?, ?, ?)`
    const results = await db
      .prepare(stmt)
      .bind(fid, profileName, 20, 0)
      .run()
    console.log('newUserCreated!', results)
  } catch (error) {
    throw error
  }

  const { results } = await db.prepare(
    "SELECT * FROM Users WHERE fid = ?"
  )
    .bind(fid)
    .all()

  return results
}

export async function getOrCreateUser(fid: number, db: D1Database) {
  let { results } = await db.prepare(
    "SELECT * FROM Users WHERE fid = ?"
  )
    .bind(fid)
    .all()
  if (results.length < 1) {
    results = await createUser(fid, db)
  } else if (results.length > 1) {
    throw new Error(`duplicate account found for fid ${fid}`)
  }
  return results[0] as User
}

export async function getUserById(id: number, db: D1Database) {
  let { results } = await db.prepare(
    "SELECT * FROM Users WHERE id = ?"
  )
    .bind(id)
    .all()
  return results[0] as User
}

export async function chargeUserForQCoining(user: User, db: D1Database) {
  if (user.points_balance < 2) return false
  const newBalance = user.points_balance - 2
  const result = await db.prepare(
    "UPDATE Users SET points_balance = ? WHERE fid = ?"
  )
    .bind(newBalance, user.fid)
    .run()
  return result.success
}

type UserAction = 'coin' | 'sendDirect' | 'answer' | 'tip'
export async function chargeUser(user: User, action: UserAction, db: D1Database) {
  const amountToCharge = action === 'coin'
    ? 2
    : action === 'sendDirect'
      ? 4
      : 1

  if (user.points_balance < amountToCharge) return false
  const newBalance = user.points_balance - amountToCharge
  const result = await db.prepare(
    "UPDATE Users SET points_balance = ? WHERE id = ?"
  )
    .bind(newBalance, user.id)
    .run()
  return result.success
}

export async function payUser(recipient: User, amount: number, db: D1Database) {
  const newBalance = recipient.points_balance + amount
  const result = await db.prepare(
    "UPDATE Users SET points_balance = ? WHERE id = ?"
  )
    .bind(newBalance, recipient.id)
    .run()
  return result.success
}

export async function bump(db: D1Database) {
  const result = await db.prepare(
    "UPDATE Users SET points_balance = ? WHERE fid = ?"
  )
    .bind(100, 10215)
    .run()
  return result.success
}

export async function createDirectQ(sender: User, recipient: User, q: Q, anon: boolean, db: D1Database) {
  // if anon
  const listedSender = anon ? 2 : sender.id
  try {
    // charge sender, pay payees
    const chargedSender = await chargeUser(sender, 'sendDirect', db)
    const paidRecipient = await payUser(recipient, 1, db)
    // if (q.coiner_id !== 2) {
    const coiner = await getUserById(q.coiner_id, db)
    await payUser(coiner, 1, db)
    // }
    // insert directQ
    if (chargedSender && paidRecipient) {
      const stmt = "INSERT INTO Directqs (sender_id, recipient_id, q_id) VALUES (?,?,?)"
      const result = await db.prepare(stmt)
        .bind(listedSender, recipient.id, q.id)
        .run()
      console.log('newDirectQCreated!', result)
    }
  } catch (error) {
    throw error
  }

  const { results } = await db.prepare(
    "SELECT * FROM Directqs WHERE recipient_id = ? AND q_id = ?"
  )
    .bind(listedSender, q.id)
    .all()

  return results
}

export async function getReceivedDirectQs(id: number, db: D1Database) {
  let { results } = await db.prepare(
    "SELECT * FROM Directqs WHERE recipient_id = ?"
  )
    .bind(id)
    .all()

  return results as DirectQ[]
}

// export async function sendDirectQ(senderId: number, recipientId: number, qId: number, db: D1Database) {

// }

//   const { rows } = await sql`SELECT * FROM users WHERE sender_id = ${senderId} AND recipient_id = ${recipientId} ORDER BY sent_at DESC;`
//   return rows[0] as Q
// }

// export async function getDirectQ(qid: string) {
//   try {
//     const { rows } = await sql`SELECT * FROM Directqs WHERE q_id = ${qid};`
//     if (rows.length) {
//       return rows[0]
//     } else {
//       return null
//     }
//   } catch (error) {
//     throw error
//   }
// }
