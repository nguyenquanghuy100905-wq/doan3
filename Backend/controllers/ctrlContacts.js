const Contacts = require('../models/contacts')

exports.getAllContacts = async (req,res) => {
	try{

		const contacts = await Contacts.getAllContacts();
		res.status(200).send(contacts);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getContactsById = async (req, res) =>{
	try{

		const contacts = await Contacts.getContactsById(req.query.id);
		if (!contacts) return res.status(404).send({ message: 'contacts không tìm thấy' });
		res.status(200).send(contacts);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.createContacts = async (req, res) => {
	try {
		const { name, email, phone, message } = req.body;
		if (!name || !email || !phone || !message) {
			return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const contactsId = await Contacts.createContacts( name, email, phone, message );
		res.status(201).send({ message: 'Tạo thành công', contactsId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.updateContacts = async (req, res) => {
	try {
		const { id } = req.query;
		const { name, email, phone, message } = req.body;
		if (!name ||!email ||!phone ||!message) {
			return res.status(400).send({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
		}
		const updatedContacts = await Contacts.updateContacts(id, name, email, phone, message );
		if (!updatedContacts){
			return res.status(404).send({ message: 'Contacts not found' });
		}
		res.status(200).send({ message: 'Cập nhật Contacts thành công', updatedContacts });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

exports.deleteContacts = async (req, res) => {
	try {
		const { id } = req.query;
		const deletedContacts = await Contacts.deleteContacts(id);
		if (!deletedContacts)
		{
			return res.status(404).send({message: 'Contacts not found' });
		}
		res.status(200).send({ message: 'Xóa Contacts  thành công', deletedContacts });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	};
};

