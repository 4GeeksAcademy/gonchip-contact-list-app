const getState = ({ getStore, getContacts, setStore }) => {
	return {
		store: {
			contactList: [
			]
		},
		actions: {

			createContact: (contact) => {
				const store = getStore();
				if (contact.full_name == "" || contact.email == "" || contact.phone == "" || contact.address == "") return false
				fetch('https://playground.4geeks.com/apis/fake/contact/', {
					method: "POST",
					body: JSON.stringify({ ...contact, "agenda_slug": "gonchip" }),
					headers: { 'Content-Type': 'application/json' }
				})
				setStore({ ...store, contactList: [...store.contactList, { ...contact, "agenda_slug": "gonchip" }] });
				return true
			},

			getContacts: () => {
				fetch('https://playground.4geeks.com/apis/fake/contact/agenda/gonchip')
				.then(function(response) {
				  
				   return response.json();
				})
				 .then(function(responseAsJson) {
					setStore({
						contactList:responseAsJson
					})
					console.log(responseAsJson)
				})
				},

			deleteContact: (elm) => {
				const store = getStore();
				fetch('https://playground.4geeks.com/apis/fake/contact/' + elm.id, {
					method: "DELETE",
					headers: { 'Content-Type': 'application/json' }
				})
				setStore({ ...store, contactList: store.contactList.filter(contacts => contacts.id != elm.id) })
			},

			editContact: ( id, data) => {
				const store = getStore();
				console.log(data, id)
				// let searchContact = store.contactList.find(person => currentContact.id == person.id)
				// if (searchContact) {
				// 	contactNewInfo.full_name != "" ? searchContact.full_name = contactNewInfo.full_name : ""
				// 	contactNewInfo.email != "" ? searchContact.email = contactNewInfo.email : ""
				// 	contactNewInfo.phone != "" ? searchContact.phone = contactNewInfo.phone : ""
				// 	contactNewInfo.address != "" ? searchContact.address = contactNewInfo.address : ""
				// 	setStore("")

					fetch('https://playground.4geeks.com/apis/fake/contact/' + id, {
						method: "PUT",
						body: JSON.stringify(data),
						headers: { 'Content-Type': 'application/json' }
					})
					// .then ((response) => )
				}
				// return true
			},

			contactsLoad: (json) => {
				const store = getStore();
				setStore({ contactList: json })
			},
		}
	};
// };

export default getState;
