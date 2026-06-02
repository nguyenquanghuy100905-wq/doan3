const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const sendEmail = require('../middleware/email');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu' });
        }
        const user = await Users.login(username, password);
        if (!user) {
            return res.status(401).send({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }
        const keytoken = jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role_user}, process.env.KEY,
            {expiresIn:'1h'}
        );
        res.status(200).send({ user, token: keytoken });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}
exports.register = async (req, res) => {
    try {
        const { username, password, name, birthday, address, email, phone } = req.body;
        if (!username || !password || !name || !birthday || !address || !email || !phone) {
            return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
        }
        const user = await Users.register(username, password, name, birthday, address, email, phone);
        res.status(201).send({ message: 'Đăng ký thành công', user });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: 'Vui lòng cung cấp email' });
        }
        const user = await Users.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: 'Email này chưa được đăng ký' });
        }
        res.status(200).send({ message: 'Email đã được đăng ký', user });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}

exports.getUserByPhone = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).send({ message: 'Vui lòng cung cấp số điện thoại' });
        }
        const user = await Users.getUserByPhone(phone);
        if (!user) {
            return res.status(404).send({ message: 'Số điện thoại này chưa được đăng ký' });
        }
        res.status(200).send({ message: 'Số điện thoại đã được đăng ký', user });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}
exports.getUserByUsername = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).send({ message: 'Vui lòng cung cấp tên đăng nhập' });
        }
        const user = await Users.getUserByUsername(username);
        if (!user) {
            return res.status(404).send({ message: 'Tên đăng nhập này chưa được đăng ký' });
        }
        res.status(200).send({ message: 'Tên đăng nhập đã được đăng ký', user });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server', error: error.message });
    };
}
exports.forgotPasswordByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: "Vui lòng cung cấp email" });
        }

        const user = await Users.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: "Email không tồn tại" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        res.clearCookie("otp");
        res.cookie("otp", otp, { maxAge: 2 * 60 * 1000, httpOnly: true });
        res.cookie("user", user.id, { maxAge: 2 * 60 * 1000, httpOnly: true });
        const emailSent = await sendEmail(
            email,
            "Mã OTP xác thực",
            `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 2 phút.`
        );

        if (!emailSent) {
            return res.status(500).send({ message: "Gửi email OTP thất bại" });
        }

        res.status(200).send({ message: "Gửi OTP thành công", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        if (!otp) {
            return res.status(400).send({ message: "Vui lòng nhập OTP" });
        }
        const savedOTP = req.cookies.otp;
        if (!savedOTP) {
            return res.status(400).send({ message: "OTP đã hết hạn hoặc không tồn tại" });
        }
        if (parseInt(otp) !== parseInt(savedOTP)) {
            return res.status(400).send({ message: "Mã OTP không chính xác" });
        }
        res.clearCookie("otp");
        res.cookie("verified", true, { maxAge: 2 * 60 * 1000, httpOnly: true });
        res.status(200).send({ message: "Xác thực OTP thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const id = req.cookies.user;
        const { password } = req.body;

        if (!id || !password) {
            return res.status(400).send({ message: "Vui lòng nhập mật khẩu mới" });
        }

        const verified = req.cookies.verified;
        if (!verified) {
            return res.status(403).send({ message: "Bạn chưa xác thực OTP" });
        }
        const updated = await Users.updatePassword(id, password);
        if (!updated) {
            return res.status(500).send({ message: "Cập nhật mật khẩu thất bại" });
        }
        res.clearCookie("verified");
        res.clearCookie("user");

        res.status(200).send({ message: "Đặt lại mật khẩu thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};



