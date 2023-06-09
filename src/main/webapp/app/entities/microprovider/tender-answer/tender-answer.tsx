import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import {
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tender-answer.reducer';
import { ITenderAnswer } from 'app/shared/model/microprovider/tender-answer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface ITenderAnswerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TenderAnswer = (props: ITenderAnswerProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { tenderAnswerList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="tender-answer-heading">
        <Translate contentKey="microgatewayApp.microproviderTenderAnswer.home.title">Tender Answers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="microgatewayApp.microproviderTenderAnswer.home.createLabel">Create new Tender Answer</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tenderAnswerList && tenderAnswerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('storeAt')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.storeAt">Store At</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('content')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.content">Content</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('providerId')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.providerId">Provider Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('executionDeley')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.executionDeley">Execution Deley</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('executionDeleyUnity')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.executionDeleyUnity">Execution Deley Unity</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('average')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.average">Average</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('startedAt')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.startedAt">Started At</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('starterId')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.starterId">Starter Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('finishedAt')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.finishedAt">Finished At</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('finisherId')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.finisherId">Finisher Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('executionAverage')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.executionAverage">Execution Average</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('confirmSelectMailSent')}>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.confirmSelectMailSent">
                    Confirm Select Mail Sent
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microgatewayApp.microproviderTenderAnswer.tender">Tender</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tenderAnswerList.map((tenderAnswer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tenderAnswer.id}`} color="link" size="sm">
                      {tenderAnswer.id}
                    </Button>
                  </td>
                  <td>{tenderAnswer.storeAt ? <TextFormat type="date" value={tenderAnswer.storeAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{tenderAnswer.content}</td>
                  <td>{tenderAnswer.providerId}</td>
                  <td>{tenderAnswer.executionDeley}</td>
                  <td>
                    <Translate contentKey={`microgatewayApp.DeleyUnity.${tenderAnswer.executionDeleyUnity}`} />
                  </td>
                  <td>{tenderAnswer.average}</td>
                  <td>
                    {tenderAnswer.startedAt ? <TextFormat type="date" value={tenderAnswer.startedAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{tenderAnswer.starterId}</td>
                  <td>
                    {tenderAnswer.finishedAt ? <TextFormat type="date" value={tenderAnswer.finishedAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{tenderAnswer.finisherId}</td>
                  <td>{tenderAnswer.executionAverage}</td>
                  <td>{tenderAnswer.confirmSelectMailSent ? 'true' : 'false'}</td>
                  <td>{tenderAnswer.tender ? <Link to={`tender/${tenderAnswer.tender.id}`}>{tenderAnswer.tender.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tenderAnswer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${tenderAnswer.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${tenderAnswer.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="microgatewayApp.microproviderTenderAnswer.home.notFound">No Tender Answers found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={tenderAnswerList && tenderAnswerList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ tenderAnswer }: IRootState) => ({
  tenderAnswerList: tenderAnswer.entities,
  loading: tenderAnswer.loading,
  totalItems: tenderAnswer.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TenderAnswer);
