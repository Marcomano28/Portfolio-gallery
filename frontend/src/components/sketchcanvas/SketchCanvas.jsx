import { Screen, Image, Button } from "./SketchCanvasStyled"

export const SketchCanvas = ({src}) => {
  return (
    <Screen>
      <Image src={src}></Image>
      <Button></Button>
    </Screen>
  )
}
