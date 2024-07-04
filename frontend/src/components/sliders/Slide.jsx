import { DescriptH, DescriptP, Description, Icon, Input, Label, Row } from './SlideStyled'

export const Slide = ({content, windowId}) => {
  return (
    <>
        <Input type="radio" name={`slide-${windowId}`} id={`slide-${content.icon}-${windowId}`} />
          <Label htmlFor={`slide-${content.icon}-${windowId}`}>
            <Row>
              <Icon>{content.icon}</Icon>
              <Description className='description'>
                <DescriptH>{content.title}</DescriptH>
                <DescriptP>{content.content}</DescriptP>
              </Description>
            </Row>
          </Label>
    </>
  )
}
