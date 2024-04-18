// colors
export enum colors {
  fcPurple = '#1F1629',
  offBlack = '#231F20',
  baseBlue = '#2151F5',
  anonRed = '#F64B47'
}

// img
export const backgroundStyles: Hono.CSSProperties = {
  backgroundSize: '100% 100%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  height: '100%',
  width: '100%',
  fontFamily: 'helvetica',
}

export const homeStyles: Hono.CSSProperties = {
  padding: '5%',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: colors.fcPurple,
  alignItems: 'center',
}

export const screenStyles: Hono.CSSProperties = {
  justifyContent: 'space-between',
  backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
}

export const avatarStyles: Hono.CSSProperties = {
  height: '369px',
  width: '369px',
  borderRadius: '50%',
}

export const amaStyles: Hono.CSSProperties = {
  color: 'white',
  fontSize: 90,
  fontWeight: 500,
  letterSpacing: '-0.025em',
  lineHeight: 1.4,
  marginLeft: 60,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  fontFamily: 'helvetica',
}

export const titleStyles: Hono.CSSProperties = {
  color: 'white',
  fontSize: 69,
  fontWeight: 700,
  letterSpacing: '-0.025em',
  lineHeight: 1.4,
  marginLeft: 60,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
}

export const headerStyles: Hono.CSSProperties = {
  width: '1140px',
  height: '60px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '30px',
  marginRight: '30px'
}

export const headerTextStyles: Hono.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  fontWeight: 500,
  color: '#333'
}

export const headerTextDataStyles: Hono.CSSProperties = {
  fontWeight: 400,
  marginLeft: '6px',
}

export const qContainerStyles: Hono.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '960px',
  paddingTop: '80px',
  paddingRight: '60px',
  paddingLeft: '60px',
  backgroundImage: 'linear-gradient(135deg, rgb(0, 124, 240), rgb(0, 223, 216))',
  backgroundClip: 'text',
  '-webkit-background-clip': 'text',
  color: 'transparent'
}

export const qStyles: Hono.CSSProperties = {
  fontWeight: 500,
}

export const qDataStyles: Hono.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginRight: '30px',
  marginLeft: '30px',
  width: '1110px',
  height: '140px',
}

export const similarQsStyles: Hono.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent: 'center',
  width: '1040px',
  height: '100%',
  fontSize: '2.5em',
  paddingLeft: '30px',
  backgroundImage: 'linear-gradient(135deg, rgb(142, 24, 182), rgb(35, 49, 211))',
  backgroundClip: 'text',
  '-webkit-background-clip': 'text',
  color: 'transparent'
}

export const qNoDataStyles: Hono.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginRight: '30px',
  width: '1110px',
  height: '140px',
}

// export const askedByStyles: Hono.CSSProperties = {
//   display: 'flex',
//   marginLeft: '6px',
//   // marginTop: '30px',
// }

// export const ownerStyles: Hono.CSSProperties = {
//   marginLeft: '7px',
// }

// export const userDataStyles: Hono.CSSProperties = {
//   display: 'flex',
//   flexDirection: 'column',
// }

// export const logoStyles: Hono.CSSProperties = {
//   height: '100px',
//   width: '100px'
// }

// shareable Q styles
export const shareableQContainerStyles: Hono.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '550px',
  paddingTop: '60px',
  paddingRight: '60px',
  paddingLeft: '60px',
  backgroundImage: 'linear-gradient(135deg, rgb(0, 124, 240), rgb(0, 223, 216))',
  backgroundClip: 'text',
  '-webkit-background-clip': 'text',
  color: 'transparent'
}

export const shareableQDataContainerStyles: Hono.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '60px',
  marginRight: '30px',
  height: '80px',
}

export const shareableQDataStyles: Hono.CSSProperties = {
  display: 'flex',
  backgroundImage: 'linear-gradient(135deg, rgb(0, 124, 240), rgb(0, 223, 216))',
  backgroundClip: 'text',
  '-webkit-background-clip': 'text',
  color: 'transparent'
}

export const coinerStyles: Hono.CSSProperties = {
  backgroundImage: 'linear-gradient(135deg, rgb(0, 124, 240), rgb(0, 223, 216))',
  backgroundClip: 'text',
  '-webkit-background-clip': 'text',
  color: 'transparent',
  marginLeft: '6px'
}

// nft img styles v1
export const canvasStyles: Hono.CSSProperties = {
  backgroundSize: '100% 100%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  height: '100%',
  width: '100%',
  padding: '32px',
}

export const borderStyles: Hono.CSSProperties = {
  width: '100%',
  height: '18px',
  display: 'flex',
  justifyContent: 'space-between',
}

export const dataStyles: Hono.CSSProperties = {
  fontWeight: 400
}

export const dataSpanStyles: Hono.CSSProperties = {
  fontWeight: 600,
  marginLeft: '8px'
}

export const qTextStyles: Hono.CSSProperties = {
  color: colors.fcPurple,
  textAlign: 'left',
  maxWidth: '1136px',
  fontSize: 69,
  fontWeight: 600,
  lineHeight: 1.3,
  marginTop: 'auto',
  marginBottom: 'auto',
  fontFamily: 'helvetica',
}

// other

export const warningStyles: Hono.CSSProperties = {
  position: 'absolute',
  bottom: 20,
  color: '#5E6773',
  fontSize: 28,
  textAlign: 'center',
  lineHeight: 1.3,
}