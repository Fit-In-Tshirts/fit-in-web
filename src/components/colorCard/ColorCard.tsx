interface Props {
  rgbCode?:string,
  hexCode?:string,
  name?:string,
}

export default function ColorCard(props: Props) {
  return (
    <div className="flex flex-row gap-0.5 justify-start items-center p-1">
      <div
        className="w-3 h-3 border rounded-full"
        style={{ backgroundColor: props.rgbCode || props.hexCode }}
      />
      <div>{props.name}</div>
    </div>
  )
}