import { Navy, Btn, BtnLink, NavContainer } from "./NavAboutStyled";

export const NavAbout = () => {
  return (
         <NavContainer>
           <Navy>
               <Btn><BtnLink to={'/'}>Home</BtnLink></Btn>
               <Btn><BtnLink to={'/points3D'}>Points3D</BtnLink></Btn>
               <Btn><BtnLink to={'/bycode'}>ByCode</BtnLink></Btn>
               <Btn><BtnLink to={'/interact'}>Interactive</BtnLink></Btn>
               <Btn><BtnLink to={'/aboutme'}>About-me</BtnLink></Btn>
           </Navy>
         </NavContainer>
  )
}
