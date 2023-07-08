export default function linksReducer(usersLinks = [], action) {

    switch(action.type){
        case 'initialize links': 
            const links = [...action.links];
            links.sort((linkOne, linkTwo) => {
                if(linkOne.order > linkTwo.order)
                    return 1;
                else if(linkOne.order < linkTwo.order)
                    return -1;
                else
                    return 0;
            })
            return [...action.links] ;

        case 'add link': 
            return [...usersLinks, action.link];
        
        case 'remove link':
            return usersLinks.filter((link) => {
                return link.id === action.linkId ? false : true
            })

        case 'update link': 
            const linkId = action.linkId;
            const newPlatform = action.platform;
            const newLink = action.link;

            return usersLinks.map((link) => {
                if(link.id === linkId)
                    return newPlatform ? {...link, platform: newPlatform} : {...link, link: newLink}
                else
                    return link
            })

        case 're-order links':
            const hoverLinkIndex = action.indices.hoverLink;
            const dropLinkIndex = action.indices.dropLink;
            const linksCopy = [...usersLinks];
            let temp = linksCopy[hoverLinkIndex].order;
            linksCopy[hoverLinkIndex].order = linksCopy[dropLinkIndex].order;
            linksCopy[dropLinkIndex].order = temp;
            linksCopy.sort((linkOne, linkTwo) => {
                if(linkOne.order > linkTwo.order)
                    return 1;
                else if(linkOne.order < linkTwo.order)
                    return -1;
                else
                    return 0;
            })
            return linksCopy;

        default: 
            return usersLinks
    }
}   