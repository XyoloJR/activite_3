/*
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
    var titreLien = document.createElement("a");
    titreLien.href = lien.url;
    titreLien.style.color = "#428bca";
    titreLien.style.textDecoration = "none";
    titreLien.style.marginRight = "5px";
    titreLien.appendChild(document.createTextNode(lien.titre));

    var urlLien = document.createElement("span");
    urlLien.appendChild(document.createTextNode(lien.url));

    // Cette ligne contient le titre et l'URL du lien
    var ligneTitre = document.createElement("h4");
    ligneTitre.style.margin = "0px";
    ligneTitre.appendChild(titreLien);
    ligneTitre.appendChild(urlLien);

    // Cette ligne contient l'auteur
    var ligneDetails = document.createElement("span");
    ligneDetails.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

    var divLien = document.createElement("div");
    divLien.classList.add("lien");
    divLien.appendChild(ligneTitre);
    divLien.appendChild(ligneDetails);

    return divLien;
}

var contenu = document.getElementById("contenu");
// Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
listeLiens.forEach(function (lien) {
    var elementLien = creerElementLien(lien);
    contenu.appendChild(elementLien);
});

//Bouton d'affichage du formulaire
var affichageFormBouton = document.getElementById("ajoutForm");

//Element Formulaire
var formElt;

//Elements du message de confirmation
var messageAjout = document.getElementById("messageAjout");
var messageTitre = document.getElementById("titre");

//Affichage du formulaire d'ajout
affichageFormBouton.addEventListener('click', function(){
    affichageFormBouton.style.display = "none";
    formElt = creerForm();
    document.body.insertBefore(formElt, contenu);
    // Animations et validation du formulaire
    formElt.addEventListener('submit', function(event){
        formElt.style.display = "none";
        affichageFormBouton.style.display = "inline-block";
        ajoutNouveauLien();
        formElt.reset();
        event.preventDefault();
    });
});

function creerForm(){
    formElt = document.createElement("form");
    formElt.id = "ajoutLien";
    formElt.appendChild(inputMaker({"type":"text",
                                "name":"auteur",
                                "placeholder": "Entrez votre nom",
                                "required":"required"}));
    formElt.appendChild(inputMaker({"type":"text",
                                "name":"titre",
                                "placeholder": "Entrez le titre du lien",
                                "size": "30",
                                "required":"required"}));
    formElt.appendChild(inputMaker({"type":"text",
                                "name":"url",
                                "placeholder": "Entrez l'URL du lien",
                                "size" : "30",
                                "required":"required"}));
    formElt.appendChild(inputMaker({"type":"submit",
                                "name":"bouton",
                                "value": "Ajouter"}));
    return formElt;
}

function inputMaker(attributes){
    var element = document.createElement("input");
    for (var key in attributes){
        element.setAttribute(key, attributes[key])
    }
    return element;
}

function ajoutNouveauLien(){
    var url = formElt.elements.url.value;
    var regex = /^https?:\/\/.+/i;
    if (!regex.test(url)){
        url = "http://" + url;
    }
    var lien ={
        auteur : formElt.elements.auteur.value,
        titre : formElt.elements.titre.value,
        url : url,
    }
    contenu.insertBefore(creerElementLien(lien),contenu.childNodes[1]);
    //gestion des affichages
    messageTitre.textContent = lien.titre;
    messageAjout.style.display = "block";
    setTimeout(function(){messageAjout.style.display = "none";}, 2000);
}
