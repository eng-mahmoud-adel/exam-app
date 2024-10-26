interface IInput {
    label?: string;
    id?: string;
    name?: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    color?: string;
    purpose?: "question" | "answer";
    disabled?: boolean;
    checked?: boolean;
    onCheckChange?: (checked: boolean) => void;
}

const Input = ({ label = "", id = "", name = "", type = "text", value, onChange, color, disabled, purpose, checked, onCheckChange }: IInput) => {
    return (
        <>
            <label htmlFor={id} className="text-xl font-semibold">{label}</label>
            <div
                className="flex items-center justify-between border border-black rounded-lg pe-4"
                style={{
                    borderColor: color,
                    color: color,
                    backgroundColor: disabled ? 'transparent' : '#fff'
                }}
            >
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className='border-0 font-semibold size-full outline-none p-4 rounded-lg bg-transparent'
                    disabled={disabled}
                />
                {purpose === 'answer' && <input
                    type="checkbox"
                    className="size-5"
                    checked={checked}
                    onChange={(e) => onCheckChange && onCheckChange(e.target.checked)}
                    disabled={disabled}
                />}
            </div>
        </>
    )
}

export default Input