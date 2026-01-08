

const Label = ({ name, label }: { name: string, label: string }) => {
    return (
        <label
            className={`label text-xs font-normal leading-base mb-2 block text-white`}
            id={name}
            style={{
                letterSpacing: "-2%"
            }}
        >
            { label }
        </label>
    )
}

export default Label;