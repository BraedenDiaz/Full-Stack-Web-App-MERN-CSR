import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { deleteUserAccount } from "../../api/Users";
import FormError from "../errors/FormError";
import { useContext } from "../Layout";

export default function AccountPage()
{
    const { username } = useParams();
    const refreshUserInfo = useContext()[1];
    const [redirect, setRedirect] = useState(false);
    const [errorState, setErrorState] = useState({
        show: false,
        errorsArr: []
    });
    
    const handleDeleteAccount = async () => {
        const responseObj = await deleteUserAccount(username!);

        if (responseObj.status === 200)
        {
            refreshUserInfo();
            setRedirect(true);
        }
        else
        {
            setErrorState({
                show: true,
                errorsArr: responseObj.json.errors.map((errorObj : any) => {
                    return errorObj.msg;
                })
            });
        }
    };
    
    if (redirect)
    {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-3 mb-3">
            <FormError show={errorState.show} errorsArr={errorState.errorsArr} />
            <h1>Account Options</h1>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAccountConfirmationModal">Delete Account</button>
            <div id="deleteAccountConfirmationModal" className="modal fade">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Delete Account</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete your account? Once you do, there's no going back.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleDeleteAccount} data-bs-dismiss="modal">Delete Account</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}