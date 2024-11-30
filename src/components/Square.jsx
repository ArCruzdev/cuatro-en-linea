export const Square = ({children, updateBoard, index, isSelected }) => {
    const className = `square ${isSelected ? 'isSelected' : ''} `

    const handleClick = () => {
      updateBoard(index)
    }
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
}