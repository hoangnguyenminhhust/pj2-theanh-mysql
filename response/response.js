module.exports = {
    success: async (res, data) => {
        return res.status(200).send({
            message: 'SUCCESS',
            success: true,
            data: data,
        });
    },
    errors: async (res, error) => {
        const {
            status
        } = res;
        if (status === 400) {
            return res.status(400).send({
                message: 'CODE_400',
                success: false,
                data: error
            });
        }
        if (status === 403) {
            return res.status(403).send({
                message: 'NOT_AUTHOZIATION',
                success: false,
                data: error
            });
        }
        if (status === 404) {
            return res.status(404).send({
                message: 'NOT_FOUND',
                success: false,
                data: error
            });
        }
        if (status === 500) {
            return res.status(500).send({
                message: 'INTERNAL_SERVER_ERROR',
                success: false,
                data: error
            });
        }
        if (status === 405) {
            return res.status(405).send({
                message: 'CODE_405',
                success: false,
                data: error
            });
        }
        return res.status(500).send({
            message: 'INTERNAL_SERVER_ERROR',
            success: false,
            data: error
        });
    },
}