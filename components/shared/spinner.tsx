import { CgSpinner } from 'react-icons/cg'

export default function Spinner() {
  return (
    <span className="inline-block relative p-0 m-0">
      <CgSpinner className="animate-spin" size="1.2rem" />
    </span>
  )
}
