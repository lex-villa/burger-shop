import React, { useEffect, useState } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        useEffect(() => {
            const reqInterceptor = axios.interceptors.request.use(req => {
                setError(null);
                return req;
            });

            const resInterceptor = axios.interceptors.response.use(res => res, err => {
                setError(err);
            });

            return(() => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            });

        }, []);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        return (
            <>
                <Modal isShown={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withErrorHandler;