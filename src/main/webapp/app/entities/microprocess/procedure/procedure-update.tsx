import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './procedure.reducer';
import { IProcedure } from 'app/shared/model/microprocess/procedure.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProcedureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProcedureUpdate = (props: IProcedureUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { procedureEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/procedure' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...procedureEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microgatewayApp.microprocessProcedure.home.createOrEditLabel">
            <Translate contentKey="microgatewayApp.microprocessProcedure.home.createOrEditLabel">Create or edit a Procedure</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : procedureEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="procedure-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="procedure-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="procedure-name">
                  <Translate contentKey="microgatewayApp.microprocessProcedure.name">Name</Translate>
                </Label>
                <AvField
                  id="procedure-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fileIdLabel" for="procedure-fileId">
                  <Translate contentKey="microgatewayApp.microprocessProcedure.fileId">File Id</Translate>
                </Label>
                <AvField id="procedure-fileId" type="string" className="form-control" name="fileId" />
              </AvGroup>
              <AvGroup>
                <Label id="storeAtLabel" for="procedure-storeAt">
                  <Translate contentKey="microgatewayApp.microprocessProcedure.storeAt">Store At</Translate>
                </Label>
                <AvField id="procedure-storeAt" type="date" className="form-control" name="storeAt" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/procedure" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  procedureEntity: storeState.procedure.entity,
  loading: storeState.procedure.loading,
  updating: storeState.procedure.updating,
  updateSuccess: storeState.procedure.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProcedureUpdate);
