interface IButton {
    text: string;
    onClick: () => void;
    color: string;
    disabled?: boolean;
}

const Button = ({ text, onClick, color, disabled }: IButton) => {
    return (
        <button
            className="p-4 rounded-lg text-white text-lg outline-none"
            onClick={onClick}
            style={{
                backgroundColor: disabled ? 'rgb(151 149 149)' : color,
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button