const db = require('../db/init_db')
const express = require('express')
const router = express.Router()

// ajouter un produit
router.post('/', (req, res, next) => {
    try {
        const { nom, description, prix, categorie } = req.body
        const stmt = db.prepare('INSERT INTO produits (nom, description, prix, categorie) VALUES (?, ?, ?, ?)')
        const info = stmt.run(
            nom,
            description,
            prix,
            categorie
        ) 

        if (info.changes === 0) return res.status(404).json({ error: "Aucun produit trouvé" })

        return res.status(201).json({
            "message": "Produit créé avec succès !",
            info
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
})

// lister tous les produits 
router.get('/', (req, res, next) => {
    const stmt = db.prepare('SELECT * FROM produits')
    const produits = stmt.all()

    if (!produits) return res.status(200).json({ "erreur": "Aucun produit trouvé !" })

    return res.status(200).json({ produits })
})

// consulter un produit
router.get('/:id', (req, res, next) => {
    const stmt = db.prepare('SELECT * FROM produits WHERE id = ?')
    const produit = stmt.get(req.params.id)

    if (!produit) return res.status(404).json({ "erreur": "Produit non trouvé !" })

    return res.status(200).send( produit )
})

// modifier un produit
router.patch('/:id', (req, res, next) => {
    try {
        const newProduit = req.body
        const stmt = db.prepare('UPDATE produits SET nom = ?, description = ?, prix = ?, categorie = ? WHERE id = ?')
        stmt.run(
            newProduit.nom,
            newProduit.description,
            newProduit.prix,
            newProduit.categorie,
            req.params.id
        )
        return res.status(200).json({ 
            "message": "Produit modifié avec succès !", 
            newProduit
         })
    } catch (error) {
        return res.status(401).json({ error })
    }
})

// remplacer un produit
router.put('/:id', (req, res, next) => {
    try {
        const newProduit = req.body
        const stmt = db.prepare('UPDATE produits SET nom = ?, description = ?, prix = ?, categorie = ? WHERE id = ?')
        stmt.run(
            newProduit.nom,
            newProduit.description,
            newProduit.prix,
            newProduit.categorie,
            req.params.id
        )
        return res.status(200).json({ "message": "Produit modifié avec succès !" })
    } catch (error) {
        return res.status(401).json({ error })
    }
})

// supprimer un produit
router.delete('/:id', (req, res, next) => {
    try {
        const stmt = db.prepare('DELETE FROM produits WHERE id = ?')
        const info = stmt.run(req.params.id)

        if (info.changes === 0) return res.status(404).json({ error: "Aucun produit trouvé" })

        return res.status(204)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router