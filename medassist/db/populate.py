import pyrebase

from auth import firebase_auth
global config, firebase, storage

config = firebase_auth()
firebase = pyrebase.initialize_app(config)

# Getting reference to storage feature of Firebase
storage = firebase.storage()

# Getting reference to Realtime Database of Firebase
database = firebase.database()


def addDepartments(name, description, image):
    d = database.child("Department_id").get().val()
    new_dept = {
        "Name": name,
        "Description": description,
        "Doctors": 0,
        "Image": image
    }

    database.child("Departments").child(d).set(new_dept)
    database.update({"Department_id": d+1})
    print("data updated")


# addDepartments("Cardiology", "Cardiology deals with the disorders of the heart as well as some parts of the circulatory system.",
#                "https://firebasestorage.googleapis.com/v0/b/virtual-hospital-32.appspot.com/o/Departments%2FCardiology%2FCardiology.jpg?alt=media&token=93db056b-0327-48ad-a271-01b97a3bfd96")

# addDepartments("Dental", "Dentistry is concerned with the health and appearance of the oral cavity which includes the teeth, gums, and tongue, as well as with the jaw",
#                "https://firebasestorage.googleapis.com/v0/b/virtual-hospital-32.appspot.com/o/Departments%2FDental%2FDental.jpg?alt=media&token=eb3fcb34-9405-4a26-936a-ce7b9c90e74c")

# addDepartments("Neurology", "Neurology deals with the diagnosis and treatment of all categories of conditions and disease involving the central and peripheral nervous systems.",
#                "https://firebasestorage.googleapis.com/v0/b/virtual-hospital-32.appspot.com/o/Departments%2FNeurology%2FNeurology.jpg?alt=media&token=85577970-bfda-41cd-86a1-8aa604d7813e")

# addDepartments("Gastroenterology", "Gastroenterology is the branch of medicine focused on the digestive system and its disorders",
#                "https://firebasestorage.googleapis.com/v0/b/virtual-hospital-32.appspot.com/o/Departments%2FGastroentrology%2FGastroenterology.jpg?alt=media&token=cf9f6d01-9c9b-4ba2-81f1-3fa36a95cbd4")

# addDepartments("Gynaecology", "Gynaecology or gynecology is the medical practice dealing with the health of the female reproductive system",
#                "https://firebasestorage.googleapis.com/v0/b/virtual-hospital-32.appspot.com/o/Departments%2FGynacology%2FGynecology.jpg?alt=media&token=5b7bddd3-859b-4b58-93b6-559ab3eb6f5f")

addDepartments("ENT", "ENT specialists treat hearing, swallowing and speech, breathing and sleep issues, allergies and sinuses, head and neck, skin disorders, and more.",
               "https: // firebasestorage.googleapis.com/v0/b/virtual-hospital-32.appspot.com/o/Departments % 2FENT % 2FENT.jpg?alt=media & token=f0133ff6-8b77-473c-8418-5bae10d493ad")
