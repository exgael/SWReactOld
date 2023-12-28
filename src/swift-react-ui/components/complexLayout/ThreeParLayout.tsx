import {
    NavigationLink,
    QuickLink,
    StackComponent,
    TextComponent,
    ThreePartLayoutComponent
} from "../../SWCore/SWTypes/Components";
import createComponent from "../../SWCore/SWElements/componentFactory";
import SWThreePartLayout from "../../SWCore/SWElements/SWDocumentation/SWDocumentation";
import {View} from "../../SWCore";

export function ThreePartLayout(...views: StackComponent[]): ThreePartLayoutComponent {

    // TODO -: Make it declarative. Easier said then done ? whatever, make it declarative.

    const navigationLinks: NavigationLink[] = buildNavigationAndQuickLinks(views);

    return createComponent<ThreePartLayoutComponent>(
        { render: function() { return (
                <SWThreePartLayout view={this as ThreePartLayoutComponent}/>
            )}},
        { navigationLinks: navigationLinks },
    );
}

function buildNavigationAndQuickLinks(sections: StackComponent[]): {
    quickLinks: QuickLink[];
    id: string;
    title: string;
    content: View
}[] {
    return sections.map(section => {
        if (!section.ariaLabel?.startsWith('Section')) {
            throw new Error('Invalid section format');
        }

        let title = '';
        let quickLinks: QuickLink[] = [];
        section.children?.forEach((child) => {

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

        return {
            id: generateId(),
            title,
            content: section,
            quickLinks
        };
    });
}

function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}
