const RecipeList = React.createClass({
    getInitialState: function () {
        return { recipes: [] };
    },
    addRecipe: function (newRecipe) {
        var recipes = this.state.recipes.concat([newRecipe]);

        this.setState({ recipes: recipes });
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (recipeList) => {
                this.setState({ recipes: recipeList });
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    },
    render: function () {
        let recipeList = this.state.recipes;
        let recipes = recipeList.map((recipe) => {
            return (
                <Recipe
                    title={recipe.title}
                    description={recipe.description}
                    id={recipe.id}
                    steps={recipe.steps}
                    ingredients={recipe.ingredients}></Recipe>
            );
        });

        return (
            <div className="recipe">
                {recipes}
                <hr />
                <RecipeForm onRecipeSubmit={this.addRecipe}/>
            </div>
        );
    }
});

ReactDOM.render(<RecipeList url="/recipes"/>, document.getElementById('content'));
