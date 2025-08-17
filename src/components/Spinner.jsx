import { BarLoader } from "react-spinners"

const Spinner = ({color = 'blue', size='150'}) => {

const override = {
    display: 'block',
    margin: '0 auto 50px auto'
}
  return (
    <div>
        <BarLoader 
            color={color}
            sixe={size}
            cssOverride={override}
            aria-label="Loading..."
        />
    </div>
  )
}

export default Spinner