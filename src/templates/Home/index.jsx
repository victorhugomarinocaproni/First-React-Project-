import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page, 
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?  // -> Operação Ternária
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : 
    posts; 

    return (
      <section className='container'>

        <div className='search-container'>
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )} 

          <SearchInput handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (  
          <p>There is no post with this Title</p>
        )}
        

        <div className='button-container'> 
          {!searchValue && (
            <Button 
              text={'Load More Posts'}
              onclick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
};

// {!!searchValue} -> Serve para converter o valor dentro da variável para Boolean
/*
Assim, podemos utilizar esse esquema para aplicar um lógica booleana:

{!!searchValue && (     
  coisa_a_ser_executada
)}
Basicamente, se TIVER algo na busca ele executa, senão, não.

{!searchValue && (
  coisa_a_ser_executada
)}
Basicamente, se NÃO tiver nada na busca, ele executa a coisa_a_ser_executada.

*/