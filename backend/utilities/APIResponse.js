class APIResponse {
    static success(res, data = { status: 200, message: "OK", data: {} }) {
        return res.status(data.status).json(data);
    }

    static error(res, data) {
        return res.status(data.status).json(data);
    }
}

module.exports = APIResponse;
