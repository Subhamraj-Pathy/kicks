const Button = ({ btnText, disabled, role = 'button', onClick = () => {} }) => {
  return (
    <button onClick={onClick} role={role} disabled={disabled} className={`px-10 py-2 rounded shadow-md tracking-widest font-extralight text-xl ${disabled ? 'bg-blue-200 text-gray-700' : 'bg-blue-900 text-white'} bg-opacity-90`}>
      {btnText}
    </button>
  )
}

export default Button
