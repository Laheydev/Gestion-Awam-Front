import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import Modal from 'react-modal';

const styleModale = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width:  '25%'
  }
};

Modal.setAppElement('#root');

export default class AddTask extends Form {
  constructor(props) {
    super(props);
    this.state = {
      category_id: '',
      type_id: '',
      timespent: '',
      collaborateur_id: '',
      time: '',
      customData: '',
      modalIsOpen: false,
      showInputCategory: false,
      showInputType: false,
      isDisabled: true,
      divType: <option value='showInputType'>Autre</option>,
      divCategory: <option value='showInputCategory'>Autre</option>,
      typeSelected: 'head',
      categorySelected: 'head'

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addType = this.addType.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }



  openModal() {
    this.setState({modalIsOpen: true});
    this.getTypes();
    this.getCategories();
    this.getCollaborateurs();
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      showInputCategory: false,
      showInputType: false,
      isDisabled: true
    });
  }

  getTypes(){
    axios({
      method:'get',
      url: `${config.url}types.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      const options = res.data.types.map(type =>
        <option key={type.id} value={type.id}>{type.name}</option>
      )
      this.setState({typeOptions: options})
    });
  }

  getCollaborateurs(){
    axios({
      method:'get',
      url: `${config.url}collaborateurs.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      const options = res.data.collaborateurs.map(collaborateur =>
        <option key={collaborateur.id} value={collaborateur.id}>{collaborateur.firstname}</option>
      )
      this.setState({collaborateursOptions: options})
    });
  }

  getCategories(){
    axios({
      method:'get',
      url: `${config.url}categories.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      const options = res.data.categorie.map(categorie =>
        <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
      )
      this.setState({categorieOptions: options});
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    this.closeModal();
    this.props.onLoad();
    const newTask = {
      category_id: this.state.category_id,
      billed: this.state.billed,
      type_id: this.state.type_id,
      status_id: 1,
      elapsedtime: '0',
      collaborateur_id: this.state.collaborateur_id,
      project_id: this.props.projectid
    };
    axios({
      method:'post',
      url: `${config.url}tasks.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newTask
    })
    .then(res => {
      this.props.onRefresh();
      this.props.onLoaded();
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(target.value === 'showInputType'){
      this.setState({showInputType: true});
    }else if(target.value === 'showInputCategory'){
      this.setState({showInputCategory: true});
    }else{
      this.setState({
        [name]: value
      });
    }

    if((this.state.category_id !== '')&&(this.state.type_id !== '')&&(this.state.collaborateur_id !== '')&&(this.state.billed !== '')){
      this.setState({
        isDisabled: false
      });
    }
  }

  addType(event){
    event.preventDefault();
    const newType = {
      name: this.state.customData
    };
    axios({
      method:'post',
      url: `${config.url}types.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newType
    })
    .then(res => {
      this.setState({
        showInputType: false,
        divType: '',
        typeSelected: res.data.type.id
      });
      this.getTypes();
    });

  }

  addCategory(event){
    event.preventDefault();
    const newCategory = {
      name: this.state.customData
    };
    axios({
      method:'post',
      url: `${config.url}categories.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newCategory
    })
    .then(res => {
      this.setState({
        showInputCategory: false,
        divCategory: '',
        categorySelected: res.data.category.id
      });
      this.getCategories();
    });

  }

  render() {
    return(
      <>
      <tbody>
        <tr>
          <th>
            <button className="btn w-75 bg-dark-awam whiteText mt-2" onClick={this.openModal}>Ajouter une tâche</button>
          </th>
        </tr>
      </tbody>
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={styleModale}
        contentLabel="Modale tâches"
        >

        <div className="container modalSizing">
          <div className="row">
            <h3 className="text-center fw-800 mb-3 col-12">Nouvelle tâche</h3>
          </div>

          <form onSubmit={this.handleSubmit} className="form-row">
            <div className={(this.state.showInputType ? 'd-block form-group newInputModale p-0' : 'd-none')}>
              <div className="row">
                <input className='form-group fieldsModal newInputModale col-11' placeholder='Nouveau type' name='customData' onChange={this.handleInputChange} /><br />
                <button className="btn bg-dark-awam newInputModale col-1 whiteText" onClick={this.addType}>+</button>
              </div>
            </div>

            <select defaultValue={this.state.typeSelected} className={"form-group newInputModale"+(this.state.showInputType ? ' d-none' : ' d-block')} name='type_id' onChange={this.handleInputChange}>
              <optgroup label="Type de tâche">
                <option value='head' disabled hidden>Type de tâche</option>
                {this.state.typeOptions}
                {this.state.divType}
              </optgroup>
            </select>


            <div  className={(this.state.showInputCategory ? 'd-block form-group newInputModale p-0' : 'd-none')}>
              <input className='form-group fieldsModal newInputModale col-11' placeholder='Nouvelle catégorie' name='customData' onChange={this.handleInputChange}></input>
              <button className="btn bg-dark-awam newInputModale col-1 whiteText" onClick={this.addCategory}>+</button>
            </div>
            <select defaultValue={this.state.categorySelected} className={"form-group newInputModale"+(this.state.showInputCategory ? ' d-none' : ' d-block')} name='category_id' onChange={this.handleInputChange}>
              <optgroup label="Catégorie de la tâche">
                <option value='head' disabled hidden>Catégorie de la tache</option>
                {this.state.categorieOptions}
                {this.state.divCategory}
              </optgroup>
            </select>


            <select defaultValue='' className="form-group fieldsModal newInputModale" name='collaborateur_id' onChange={this.handleInputChange}>
              <optgroup label="Collaborateur">
                <option value='' disabled hidden>Collaborateur affecté</option>
                {this.state.collaborateursOptions}
              </optgroup>
            </select>


            <input placeholder='Facture' className="form-group fieldsModal newInputModale" type="text" name='billed' onChange={this.handleInputChange}></input>

            <input disabled={this.state.isDisabled} className={"btn bg-dark-awam mx-auto whiteText btnModale" + (this.state.isDisabled ? ' bg-disabled' : ' bg-dark-awam') } type="submit" value="Enregistrer" />
          </form>
        </div>
      </Modal>

      </>
  )
}
}
