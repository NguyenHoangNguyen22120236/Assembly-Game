export default function LanguageList(props) {
    function styleLanguage(language, index) {
        return {
            backgroundColor: language.backgroundColor,
            color: language.color,
            filter: index >= props.attempts ? "none" : "brightness(50%)",
            position: 'relative'
        }
    }

    function styleDeath() {
        return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',// Điều chỉnh khoảng cách nếu cần
        }
    }

    return props.languages.map((language, index) => {
        return (
            <div key={index} style={styleLanguage(language, index)}
                className='rounded p-3 m-2'>
                {language.name}
                {index >= props.attempts ? null :
                    <span style={styleDeath()}>
                        💀
                    </span>}

            </div>
        )
    })
}