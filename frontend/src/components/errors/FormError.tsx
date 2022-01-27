
type PropsType = {
    show: boolean,
    errorsArr: string[]
};

export default function FormError(props : PropsType)
{
    const styles : React.CSSProperties = props.show ? {display: "block"} : {display: "none"};

    return (
        <div className="alert alert-danger" style={styles}>
            <strong>Error:</strong>
            <ul>
                {props.errorsArr.map((errorMessage : string, index : number) => {
                    return <li key={"error_message_" + index}><p>{errorMessage}</p></li>
                })}
            </ul>
        </div>
    );
}