import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = { cvere: '', page: 1, imeges: [], isVisBle: false, isEmpty: false };
  onHandelSadmet = value => {
    this.setState({ cvere: value, page: 1, imeges: [], isEmpty: false });
  };
  componentDidUpdate(prevProps, prevState) {
    const { cvere, page } = this.state;
    if (prevState.cvere !== cvere || prevState.page !== page) {
      this.getFotos(cvere, page);
    }
  }
  getFotos = async (cvere, page) => {
    if (!cvere) {
      return;
    }
    try {
      const {
        photos,
        total_results,
        per_page,
        page: currentPage,
      } = await ImageService.getImages(cvere, page);
      if (photos.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        imeges: [...prevState.imeges, ...photos],
        isVisBle: currentPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  onButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { imeges, isVisBle, isEmpty } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandelSadmet} />
        {isEmpty && <div>the is no images</div>}
        <Grid>
          {imeges.length > 0 &&
            imeges.map(({ id, avg_color, alt, src }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
        </Grid>
        {isVisBle && <Button onClick={this.onButtonClick}>Load more</Button>}
      </>
    );
  }
}
