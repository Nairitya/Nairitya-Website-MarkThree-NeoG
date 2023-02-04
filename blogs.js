async function gql(query, variables = {}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}
const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "nairitya") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                    coverImage
                }
            }
        }
    }
`;
gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const articles = result.data.user.publication.posts;

        // let container = document.createElement('div');

        articles.forEach(article => {
            let container = document.createElement('div');
            container.classList.add("container", "container-center");
            container.style.objectFit = "cover";

            let title = document.createElement('h2');
            title.innerText = article.title;

            let brief = document.createElement('p');
            brief.innerText = article.brief;

            let button = document.createElement('BUTTON');
            button.classList.add("button", "button-secondary");

            let link = document.createElement('a');
            link.innerText = 'Read more...';
            link.href = `https://nairitya.hashnode.dev/${article.slug}`;
            link.target = '_blank';
            link.classList.add("link-secondary");

            button.appendChild(link);

            let image = document.createElement('IMG');
            image.src = article.coverImage;

            image.style.maxWidth = "100%"

            container.appendChild(image);
            container.appendChild(title);
            container.appendChild(brief);
            container.appendChild(button);
            // container.appendChild(innerContainer);
            document.querySelector('.app').appendChild(container);
        })

    });