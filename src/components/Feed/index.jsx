import React from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const Post = ({ avatar, username, content, timestamp }) => (
  <Card style={{ marginBottom: 16 }}>
    <CardContent>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={avatar} />
        <div style={{ marginLeft: 16 }}>
          <Typography variant="h6" component="div">
            {username}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {timestamp}
          </Typography>
        </div>
      </div>
      <Typography variant="body1" style={{ marginTop: 16 }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </div>
    </CardContent>
  </Card>
);

const Feed = () => {
  const posts = [
    {
      id: 1,
      avatar: 'url_do_avatar1',
      username: 'Bia',
      content: "<p>Entregou tudo</p><p>Desde o momento em que eu soube que o Jacks teria um livro, fiquei ansiosa pra ler. Agora que li, posso dizer que o livro entregou tudo o que prometeu.</p><p>A escrita da Stephanie é maravilhsoa, e eu amo que em todas as suas histórias, tudo acontece de maneira fluída e natural. A história tem fluxo rápido que impede que tenha sequer um capítulo parado.</p><p>A Evangeline me cativou muito, é fácil entendê-la e sentir compaixão por ela. Maravilhosa! O Jacks então... não consigo ser imparcial, então só digo: que maravilhoso ter um pouco mais do Príncipe de Copas.</p><p>O crossover foi incrível pra matar a saudade das meninas. Só queria que os meninos também tivessem aparecido.</p>Tô ansiosa e com altas expectativas pro próximo livro da série.",
      timestamp: '2 minutos atrás',
    },
    {
      id: 2,
      avatar: 'url_do_avatar2',
      username: 'Luiza',
      content: 'O livro em si é perfeito, a leitura em si te prende a querer continuar lendo mais e mais, a forma que a stephanie conduziu o desenrolar da história foi impressionante, ansiosa para o próximo livro.',
      timestamp: '15 minutos atrás',
    },
    {
        id: 3,
        avatar: 'url_do_avatar2',
        username: '@marie58',
        content: '<p>FANTASIA MARAVILHOSA</p><p>Macho, n sei oq é melhor, os personagens, os segredos, a fantasia em si, ou as mini migalhas de romance.</p><p>a Evangeline é tão inteligente mas as vezes é trouxa e ela sabe. q n pode se iludir pelo jacks ja q ele é bem manipulador mas mesmo assim ela confia, e a última cena mds, to doida pra saber q coisa é essa.</p><p>enfim muito bom.</p>',
        timestamp: '25 minutos atrás',
    },
    {
        id: 2,
        avatar: 'url_do_avatar2',
        username: 'Usuario2',
        content: 'Conteudo do tweet 2',
        timestamp: '10 minutos atrás',
    },{
        id: 2,
        avatar: 'url_do_avatar2',
        username: 'Usuario2',
        content: 'Conteudo do tweet 2',
        timestamp: '10 minutos atrás',
    },{
        id: 2,
        avatar: 'url_do_avatar2',
        username: 'Usuario2',
        content: 'Conteudo do tweet 2',
        timestamp: '10 minutos atrás',
    },{
        id: 2,
        avatar: 'url_do_avatar2',
        username: 'Usuario2',
        content: 'Conteudo do tweet 2',
        timestamp: '10 minutos atrás',
    },{
        id: 2,
        avatar: 'url_do_avatar2',
        username: 'Usuario2',
        content: 'Conteudo do tweet 2',
        timestamp: '10 minutos atrás',
    },
    
  ];

  return (
    <Paper style={{ padding: 16 }}>
      {posts.map((post) => (
        <Post
          key={post.id}
          avatar={post.avatar}
          username={post.username}
          content={post.content}
          timestamp={post.timestamp}
        />
      ))}
    </Paper>
  );
};

export default Feed;
