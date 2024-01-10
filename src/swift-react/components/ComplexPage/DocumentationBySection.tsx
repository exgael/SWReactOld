import {
    QuickLink,
    ScrollViewComponent,
    Section,
    StackComponent,
    TextComponent,
    ThreePartLayoutComponent
} from "../../SWCore/SWTypes/Components";
import createComponent from "../../SWCore/SWElements/componentFactory";
import SWDocumentationBySection from "../../SWCore/SWTemplates/SWDocumentation/SWDocumentation";

export function DocumentationBySection(...views: (StackComponent | ScrollViewComponent) []): ThreePartLayoutComponent {

    const sections: Section[] = buildNavigationAndQuickLinks(views);

    return createComponent<ThreePartLayoutComponent>(
        {
            toJSX: function () {
                return (
                    <SWDocumentationBySection view={this as ThreePartLayoutComponent}/>
                )
            }
        },
        {sections: sections},
    );
}

function buildNavigationAndQuickLinks(views: (StackComponent | ScrollViewComponent)[]): Section[] {
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
                    quickLinks.push({id: val, headline: (child as TextComponent).text || ''});
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
