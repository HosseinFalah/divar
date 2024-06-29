/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option Module And Routes
 */

/**
 * @swagger
 *  components:
 *      schemas: 
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key: 
 *                      type: string
 *                  category: 
 *                      type: string
 *                  guid:
 *                      type: string
 *                  type: 
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                  enum: 
 *                      type: array
 *                      items: 
 *                          type: string
 */

/**
 * @swagger
 * /option:
 *  post:
 *      summary: create new option for category
 *      tags: 
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *      responses:
 *          201:
 *              description: created
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: get all option of category
 *      tags:   
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200:
 *              description: successFully
 */

/**
 * @swagger
 * /option/by-category-slug/{slug}:
 *  get:
 *      summary: get all option of category
 *      tags:   
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: slug
 *              type: string
 *      responses:
 *          200:
 *              description: successFully
 */

/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get option by id
 *      tags:   
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: successFully
 */

/**
 * @swagger
 * /option/:
 *  get:
 *      summary: get all option
 *      tags:   
 *          -   Option
 *      responses:
 *          200:
 *              description: successFully
 */