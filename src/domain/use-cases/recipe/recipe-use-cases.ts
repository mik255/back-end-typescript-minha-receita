import { CreateRecipeInputDto, DefaultRecipeOutputDto, GetRecipesInputDto } from "../../dto/recipe-dto";
import RecipeEntity from "../../entities/recipe";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { IImageService } from "../../services/image-service";


export interface recipeUseCase {
    getRecipesByUserId(getRecipesInputDto: GetRecipesInputDto): Promise<DefaultRecipeOutputDto[]>;
    getRecipeById(id: string): Promise<RecipeEntity>;
    createRecipe(createRecipeInputDto: CreateRecipeInputDto): Promise<DefaultRecipeOutputDto>;
    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    deleteRecipe(id: number): Promise<void>;
}

export class RecipeUseCase implements recipeUseCase {
    private recipeRepository: RecipeRepository;
    private iImageService: IImageService;
    constructor(recipeRepository: RecipeRepository, iImageService: IImageService) {
        this.recipeRepository = recipeRepository;
        this.iImageService = iImageService;
    }

    async getRecipesByUserId(getRecipesInputDto: GetRecipesInputDto): Promise<DefaultRecipeOutputDto[]> {
        try {
            var recipies = await this.recipeRepository.getRecipes(
                getRecipesInputDto.page,
                getRecipesInputDto.pageSize,
                getRecipesInputDto.userId)

            return recipies.map(e => new DefaultRecipeOutputDto(e));
        } catch (e) {
            throw new Error(e.message);
        }

    }

    getRecipeById(id: string): Promise<RecipeEntity> {
        return this.recipeRepository.getRecipeById(id);
    }

    async createRecipe(createRecipeInputDto: CreateRecipeInputDto): Promise<DefaultRecipeOutputDto> {
        try {
            
            var recipe = new RecipeEntity(
                '',
                createRecipeInputDto.userId,
                createRecipeInputDto.title,
                createRecipeInputDto.description,
                createRecipeInputDto.difficulty,
                createRecipeInputDto.status,
                createRecipeInputDto.timeInMinutes,
                createRecipeInputDto.imgFiles,
                createRecipeInputDto.ingredients,
                createRecipeInputDto.steps
            );
            var recipe = await this.recipeRepository.createRecipe(recipe);
            
            return new DefaultRecipeOutputDto(recipe);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        throw new Error("Method not implemented.");
    }

    deleteRecipe(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}