import i18n from "./i18n";

const changeLanguage = async (language: string): Promise<void> => {
    await i18n.changeLanguage(language);
};