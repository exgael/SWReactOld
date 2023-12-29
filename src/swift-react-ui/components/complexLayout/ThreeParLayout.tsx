import {
    Section,
    QuickLink,
    StackComponent,
    TextComponent,
    ThreePartLayoutComponent
} from "../../SWCore/SWTypes/Components";
import createComponent from "../../SWCore/SWElements/componentFactory";
import SWThreePartLayout from "../../SWCore/SWTemplates/SWDocumentation/SWDocumentation";

export function DocumentationBySection(...views: StackComponent[]): ThreePartLayoutComponent {

    const sections: Section[] = buildNavigationAndQuickLinks(views);

    return createComponent<ThreePartLayoutComponent>(
        { render: function() { return (
                <SWThreePartLayout view={this as ThreePartLayoutComponent}/>
            )}},
        { sections: sections },
    );
}
function buildNavigationAndQuickLinks(views: StackComponent[]): Section[] {
    return views.map(view => {
        if (!view.ariaLabel?.startsWith('Section')) {
            throw new Error('Invalid section format');
        }

        let title = '';
        let quickLinks: QuickLink[] = [];
        view.children?.forEach((child) => {

            switch (child.ariaLabel) {
                case 'Title':
                    title = (child as TextComponent).text || '';
                    break;
                case 'Subheadline':
                    const val = generateId()
                    child.id = val
                    quickLinks.push({ id: val, headline: (child as TextComponent).text || '' });
                    break;
            }
        });

        const section: Section = {
            id: generateId(),
            title, // For Section nav
            view, // View of the section
            quickLinks // For quick nav
        }
        return section;
    });
}

function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}
