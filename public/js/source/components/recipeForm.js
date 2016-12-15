const RecipeForm = React.createClass({
    getInitialState() {
        return {title: "", description: "", steps: [], ingredients: [], newIngredient: "", newStep: ""};
    },
    resetState() {
        this.setState({title: "", description: "", steps: [], ingredients: [], newIngredient: "", newStep: ""});
    },
    submitForm(e) {
        e.preventDefault();

        this.props.onRecipeSubmit(this.state);
        this.resetState();
    },
    changeTitle(e) {
        this.setState({title: e.target.value});
    },
    changeDescription(e) {
        this.setState({description: e.target.value});
    },
    addIngredient(e) {
        let ingredients = this
            .state
            .ingredients
            .concat([this.state.newIngredient]);

        this.setState({ingredients: ingredients, newIngredient: ""});
    },
    changeNewIngredientText(e) {
        this.setState({newIngredient: e.target.value});
    },
    addStep(e) {
        let steps = this
            .state
            .steps
            .concat([this.state.newStep]);

        this.setState({steps: steps, newStep: ""});
    },
    changeNewStepText(e) {
        this.setState({newStep: e.target.value});
    },
    render() {
        let newTitleText = `New Recipe: ${this.state.title || ''} (${this.state.ingredients.length} ingredients, ${this.state.steps.length} steps)`;
        console.log(this.state);

        return (
            <div className="recipe">
                <h3>Add a New Recipe</h3>
                <form className="form-horizontal" onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="newTitle" className="col-sm-3 control-label">Title</label>
                        <div className="col-sm-9">
                            <input
                                className="form-control"
                                id="newTitle"
                                placeholder="New Recipe"
                                onChange={this.changeTitle}
                                value={this.state.title}
                                type="text"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newDescription" className="col-sm-3 control-label">Description</label>
                        <div className="col-sm-9">
                            <textarea
                                className="form-control"
                                id="newDescription"
                                placeholder="Recipe description"
                                value={this.state.description}
                                onChange={this.changeDescription}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newIngredientText" className="col-sm-3 control-label">New Ingredient</label>
                        <div className="col-sm-9">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="newIngredientText"
                                    placeholder="New Ingredient"
                                    value={this.state.newIngredient}
                                    onChange={this.changeNewIngredientText}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button" onClick={this.addIngredient}>Add Ingredient</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newStepText" className="col-sm-3 control-label">New Step</label>
                        <div className="col-sm-9">
                            <textarea
                                className="form-control"
                                id="newStepText"
                                placeholder="New Step Instructions"
                                value={this.state.newStep}
                                onChange={this.changeNewStepText}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button className="btn btn-primary" type="button" onClick={this.addStep}>Add Step</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-default">Add Recipe</button>
                        </div>
                    </div>
                </form>
                <Recipe
                    title={newTitleText}
                    description={this.state.description}
                    steps={this.state.steps}
                    ingredients={this.state.ingredients}></Recipe>
            </div>
        );
    }
});