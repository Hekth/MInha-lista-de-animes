import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from 'pages/Inicio';
import AnimesProvider from 'contextos/animesContexto';
import AdicionarAnime from 'pages/AdicionarAnime';
import AdicionaAnimeProvider from 'contextos/adicionaAnimeContexto';
import MeusAnimes from 'pages/MeusAnimes';
import NaoEncontrado from 'pages/NaoEncontrado';
import ContainerBase from 'pages/ContainerBase';

function AppRouter() {
  
  return (
    <AdicionaAnimeProvider>
      <AnimesProvider>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<ContainerBase />}>
                <Route index element={<Inicio />} />
                <Route path='adicionar/:id' element={<AdicionarAnime />} />
                <Route path='meusAnimes' element={<MeusAnimes />} />
              </Route>
              <Route path='*' element={<NaoEncontrado />} />
            </Routes>
          </BrowserRouter>
      </AnimesProvider>
    </AdicionaAnimeProvider>
  );
}

export default AppRouter;
