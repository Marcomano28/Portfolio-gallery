import { Navy, Btn, BtnLink } from "./NavStyled"


export const Nav = () => {
  return (
    <Navy>
        <Btn><BtnLink to={'/'}>Home</BtnLink></Btn>
        <Btn><BtnLink to={'/points3D'}>Points3D</BtnLink></Btn>
        <Btn><BtnLink to={'/bycode'}>ByCode</BtnLink></Btn>
        <Btn><BtnLink to={'/interact'}>Interactive</BtnLink></Btn>
        <Btn><BtnLink to={'/aboutme'}>About-me</BtnLink></Btn>
    </Navy>
  )
}
