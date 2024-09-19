import _ from 'lodash'

const Separator = (props: any) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        transform: `rotate(${props.turns}turn)`,
      }}
    >
      <div style={props.style} />
    </div>
  )
}

const RadialSeparators = (props: any) => {
  const turns = 1 / props.count
  return (
    <>
      {_.range(props.count).map((index) => (
        <Separator key={index} turns={index * turns} style={props.style} />
      ))}
    </>
  )
}

export default RadialSeparators
