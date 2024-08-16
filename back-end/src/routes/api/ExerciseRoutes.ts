const express = require('express');

const {
  getAllExercises,
  createExercise,
  getExerciseById,
  updateExercise,
  deleteExercise,
  getUserTrainingExercises,
  getClientExercisesByDateRange,
  deleteUsersTrainingExercises,
  deleteTrainingExercises,
  createOrUpdateUserTrainingExercise,
  getLatestResultsByClientId,
} = require('../../controllers/ExerciseController');

/**
 * @module ExerciseRoutes
 * @description Router for exercise-related endpoints. Mounted on /api/exercises.
 * @type {express.Router}
 * @const
 * @see {@link getAllExercises} for more information on the getAllExercises function
 * @see {@link createExercise} for more information on the createExercise function
 * @see {@link getExerciseById} for more information on the getExerciseById function
 * @see {@link updateExercise} for more information on the updateExercise function
 * @see {@link deleteExercise} for more information on the deleteExercise function
 * @see {@link getUserTrainingExercises} for more information on the getUserTrainingExercises function
 * @see {@link deleteUsersTrainingExercises} for more information on the deleteUsersTrainingExercises function
 * @see {@link deleteTrainingExercises} for more information on the deleteTrainingExercises function
 * @see {@link createUserOrUpdateUserTrainingExercise} for more information on the createUserOrUpdateUserTrainingExercise function
 * @see {@link getExerciseById} for more information on the getExerciseById function
 * @see {@link updateExercise} for more information on the updateExercise function
 * @see {@link deleteExercise} for more information on the deleteExercise function
 */
const router = express.Router();

router.route('/user-training-exercises').get(getUserTrainingExercises);

router.route('/clientExercisesByDateRange').get(getClientExercisesByDateRange);

router
  .route('/delete-users-training-exercises')
  .delete(deleteUsersTrainingExercises);
router.route('/delete-training-exercises').delete(deleteTrainingExercises);

router.route('/create-user-exercise').post(createOrUpdateUserTrainingExercise);

router.route('/').get(getAllExercises).post(createExercise);
router
  .route('/:id')
  .get(getExerciseById)
  .put(updateExercise)
  .delete(deleteExercise);

router.route('/:id/latest-results').get(getLatestResultsByClientId);

module.exports = router;
export {};
