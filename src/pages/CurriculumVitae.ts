import {Body, Color, Subheadline, Title, VStack} from "../swift-react";
import {DocumentationBySection} from "../swift-react/components/ComplexPage/DocumentationBySection";


export function CurriculumVitae() {
    return VStack(
        DocumentationBySection(
            Exemple(),
            LanguageSkills(),
            ProfessionalSkills(),
            Interests(),
            Education(),
            ProfessionalExperience(),
            Certifications()
        )
    )
}

function LanguageSkills() {
    return VStack(
        CVTitle("Langues")
        ,
        Body("Arabe: Courant")
        ,
        Body("Français: Courant")
        ,
        Body("Anglais: Courant (TOEIC 885/990)")
        ,
        Body("Italien: Intermédiaire")
        ,
        Body("Allemand: Débutant")
    ).gap("20px").setAriaLabel("Section");
}

function ProfessionalSkills() {
    return VStack(
        CVTitle("Compétences"),
        Body("Maîtrise des outils de résolution des problèmes"),
        Body("Sens de l’écoute"),
        Body("Autonomie"),
        Body("Esprit d’équipe"),
        Body("Rigueur"),
        Body("Bon relationnel")
    ).gap("20px").setAriaLabel("Section");
}

function Interests() {
    return VStack(
        CVTitle("Centre d'Intérêt"),
        Body("Randonnées"),
        Body("Voyages"),
        Body("Bénévolat: Restos du cœur, AFEV")
    ).gap("20px").setAriaLabel("Section");
}

function Education() {
    return VStack(
        CVTitle("Formation"),
        Body("Master en management de la qualité, Université de Strasbourg, 2019-2021, Strasbourg"),
        Body("Licence en économie et Gestion, Université de Strasbourg, 2016-2019, Strasbourg")
    ).gap("20px").setAriaLabel("Section");
}

function ProfessionalExperience() {
    return VStack(
        CVTitle("Parcours Professionnel"),
        Subheadline("Astek, Ingénieur qualité projet"),
        Body("Depuis mai 2022, Mondeville. [Description des activités]"),
        Subheadline("Faurecia, Qualiticienne en alternance"),
        Body("2020-2021, Marckolsheim. [Description des activités]")
    ).gap("20px").setAriaLabel("Section");
}

function Certifications() {
    return VStack(
        CVTitle("Certificats et Formation"),
        Body("Green Belt Lean Six Sigma: Décerné le 1er septembre 2021 à l’université de Strasbourg"),
        Body("Certificat Internet et Informatique: Obtention du C2i en 2018 à l’université de Strasbourg")
    ) .gap("20px").setAriaLabel("Section");
}

function Exemple() {
    return VStack(
        CVTitle("Section Title")
        ,

        Subheadline("What is Lorem Ipsum?")
        ,
        Body("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
        ,
        Subheadline("Where does it come from?")
        ,
        Body("Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.")
        ,
        Subheadline("Why do we use it?")
        ,
        Body("t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).")
        ,
        Subheadline("Where can I get some?")
        ,
        Body("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.")
        ,
    )
        .gap("4vh")
        .setAriaLabel("Section")
}

function Stage() {
    return VStack(
        CVTitle("Stage")
        ,
        Subheadline("Sub2")
        ,
        Body("Body2")
    )
        .gap("4vh")
        .setAriaLabel("Section")
}



function Work() {
    return VStack(
        CVTitle("Work")
        ,
        Subheadline("Sub3")
        ,
        Body("Body3")
    )
        .setAriaLabel("Section")
}



function CVTitle(str: string) {
    return Title(str)
        .font("MerryWeather", "30px")
        .foregroundStyle(Color.olive)
}