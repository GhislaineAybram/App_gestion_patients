/// <reference lib="dom"/>
// URL de l'API générée par JSON-SERVER
var BASE_URL = "http://localhost:3000";
function $(selector) {
    return document.querySelector(selector);
}
// Génére un ID avec le timestamp + nb aléatoire
var generateUniqueId = function () {
    var timestamp = new Date().getTime();
    var randomNumber = Math.floor(Math.random() * 1000);
    return "".concat(timestamp).concat(randomNumber);
};
// Supprime le patient de la base de données
var deletePatient = function (id) {
    if (confirm("Voulez-vous vraiment supprimer ce patient ?")) {
        fetch("".concat(BASE_URL, "/patients/").concat(id), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error("Erreur réseau");
            }
            // mets à jour la liste suite à la suppression
            generatePatientsList();
        })
            .catch(function (error) {
            console.error("Erreur lors de la suppression du patient:", error);
        });
    }
};
// Génère la liste de patients sur la page d'accueil
var generatePatientsList = function () {
    var tbodyElement = document.getElementById("patients-table-body");
    fetch("".concat(BASE_URL, "/patients"))
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des patients.");
        }
        return response.json();
    })
        .then(function (patients) {
        for (var _i = 0, patients_1 = patients; _i < patients_1.length; _i++) {
            var patient = patients_1[_i];
            // crée une nouvelle ligne pour chaque patient de la base de données
            var trElement = document.createElement("tr");
            var cellsHTML = "\n      <td>".concat(patient.id, "</td>\n      <td>").concat(patient.lastname, "</td>\n      <td>").concat(patient.firstname, "</td>\n      <td>").concat(patient.date_of_birth, "</td>\n      <td>\n        <a href=\"fiche.html?id=").concat(patient.id, "\"><button class=\"button-edit\">\n        <svg class=\"svg-icon\" fill=\"none\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"#595959\" stroke-linecap=\"round\" stroke-width=\"2\"><path d=\"m20 20h-16\"></path><path clip-rule=\"evenodd\" d=\"m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z\" fill-rule=\"evenodd\"></path></g></svg>\n        <span class=\"editer\">Editer</span>\n        </button></a>\n      </td>\n      <td>\n        <button class=\"button-delete\" onclick=\"deletePatient(").concat(patient.id, ")\">\n        <svg class=\"svg-icon\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" height=\"20\" width=\"20\" viewBox=\"0 0 50 59\">\n        <path fill=\"#9C0006\" d=\"M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z\"></path>\n        <path fill=\"#9C0006\" d=\"M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z\"></path>\n        <path fill=\"#9C0006\" d=\"M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\"></path>\n        <path fill=\"#9C0006\" d=\"M2 13H48L47.6742 21.28H2.32031L2 13Z\"></path>\n        </svg>\n        <span class=\"supprimer\">Supprimer</span>\n        </button>\n      </td>\n    ");
            trElement.innerHTML = cellsHTML;
            tbodyElement.appendChild(trElement);
        }
    });
};
// Vérifie les données du formulaire nouveau patient et les regroupe
document.addEventListener("DOMContentLoaded", function () {
    var createPatientForm = document.querySelector(".createPatient");
    if (createPatientForm) {
        createPatientForm.addEventListener("submit", function (event) {
            event.preventDefault();
            // Données formulaire
            var lastname = $('.createPatient input[id="lastname"]').value.trim();
            var firstname = $('.createPatient input[id="firstname"]').value.trim();
            var dateOfBirth = $('.createPatient input[id="date-of-birth"]').value.trim();
            var placeOfBirth = $('.createPatient input[id="place-of-birth"]').value.trim();
            var profilePictureInput = $('.createPatient input[id="profile-picture"]');
            var profilePictureFile = profilePictureInput.files[0];
            // Seulement si tous les champs sont remplis le nouveau patient est créé
            if (lastname &&
                firstname &&
                dateOfBirth &&
                placeOfBirth &&
                profilePictureFile) {
                var id_1 = generateUniqueId();
                var lastnameFormatted_1 = lastname.toUpperCase();
                var firstnameFormatted_1 = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
                var dateOfBirthFormatted_1 = dateOfBirth;
                var placeOfBirthFormatted_1 = placeOfBirth.toUpperCase();
                var reader_1 = new FileReader();
                reader_1.onloadend = function () {
                    var profilePictureBase64 = reader_1.result;
                    var patient = {
                        id: id_1,
                        lastname: lastnameFormatted_1,
                        firstname: firstnameFormatted_1,
                        date_of_birth: dateOfBirthFormatted_1,
                        place_of_birth: placeOfBirthFormatted_1,
                        picture: profilePictureBase64,
                    };
                    createPatient(patient);
                };
                reader_1.readAsDataURL(profilePictureFile);
            }
            else {
                console.error("Merci de renseigner tous les champs !");
            }
        });
    }
});
// Ajoute un nouveau patient à la base de données
var createPatient = function (patient) {
    fetch("".concat(BASE_URL, "/patients"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du patient.");
        }
        return response.json();
    })
        .then(function (data) {
        console.log("Data added:", data);
        window.location.href = "index.html";
    })
        .catch(function (error) {
        console.error("Error:", error);
    });
};
// Affiche les données du patient
var getPatientInfo = function (patientId) {
    fetch("".concat(BASE_URL, "/patients/").concat(patientId), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données du patient.");
        }
        return response.json();
    })
        .then(function (patient) {
        // Affiche le titre de la fiche patient
        var h2Element = document.getElementById("patient-info");
        h2Element.textContent += "".concat(patient.lastname, " ").concat(patient.firstname);
        var lastnameInput = document.getElementById("lastname");
        var firstnameInput = document.getElementById("firstname");
        var dateOfBirthInput = document.getElementById("date-of-birth");
        var placeOfBirthInput = document.getElementById("place-of-birth");
        var pictureElement = document.getElementById("picture");
        lastnameInput.value = patient.lastname;
        firstnameInput.value = patient.firstname;
        dateOfBirthInput.value = patient.date_of_birth;
        placeOfBirthInput.value = patient.place_of_birth;
        pictureElement.src = patient.picture;
    })
        .catch(function (error) {
        console.error("Erreur:", error.message);
    });
};
// Permet de récupérer les données modifiées
document.addEventListener("DOMContentLoaded", function () {
    var editPatientForm = document.querySelector(".editPatient");
    if (editPatientForm) {
        editPatientForm.addEventListener("submit", function (event) {
            event.preventDefault();
            // Récupére l'ID du patient
            var params = new URLSearchParams(window.location.search);
            var id = params.get("id");
            // Récupére l'URL de l'image actuelle
            fetch("".concat(BASE_URL, "/patients/").concat(id))
                .then(function (response) {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données du patient.");
                }
                return response.json();
            })
                .then(function (currentImageData) {
                var currentPicture = currentImageData.picture;
                // Données formulaire
                var lastname = document.getElementById("lastname");
                var firstname = document.getElementById("firstname");
                var dateOfBirth = document.getElementById("date-of-birth");
                var placeOfBirth = document.getElementById("place-of-birth");
                // Seulement si tous les champs sont remplis les infos patient sont modifiées
                if (lastname && firstname && dateOfBirth && placeOfBirth) {
                    var lastnameFormatted = lastname.value.trim().toUpperCase();
                    var firstnameFormatted = firstname.value.trim().charAt(0).toUpperCase() +
                        firstname.value.trim().slice(1).toLowerCase();
                    var dateOfBirthFormatted = dateOfBirth.value.trim();
                    var placeOfBirthFormatted = placeOfBirth.value
                        .trim()
                        .toUpperCase();
                    var editedPatient = {
                        id: id,
                        lastname: lastnameFormatted,
                        firstname: firstnameFormatted,
                        date_of_birth: dateOfBirthFormatted,
                        place_of_birth: placeOfBirthFormatted,
                        picture: currentPicture, // Utilise l'URL de l'image actuelle
                    };
                    fetch("".concat(BASE_URL, "/patients/").concat(id), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(editedPatient),
                    })
                        .then(function (response) {
                        if (!response.ok) {
                            throw new Error("Erreur lors de l'édition du patient.");
                        }
                        return response.json();
                    })
                        .then(function (data) {
                        console.log("Data modified:", data);
                        window.location.href = "index.html";
                    })
                        .catch(function (error) {
                        console.error("Error:", error);
                    });
                }
                else {
                    alert("Merci de renseigner tous les champs !");
                }
            })
                .catch(function (error) {
                console.error("Erreur:", error.message);
            });
        });
    }
});
// Fonction zoom de la photo patient (depuis le site w3schools)
var imageZoom = function (imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /* Create lens: */
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);
    /* Calculate the ratio between result DIV and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        /* Calculate the position of the lens: */
        x = pos.x - lens.offsetWidth / 2;
        y = pos.y - lens.offsetHeight / 2;
        /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - lens.offsetWidth) {
            x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
            y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }
        /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /* Display what the lens "sees": */
        result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
    }
    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
};
