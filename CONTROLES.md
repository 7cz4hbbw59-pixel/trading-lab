# Contrôles v130

Réalisés dans l'environnement de développement :

- **Node `--check`** : contrôle de syntaxe de tous les **51 scripts JavaScript inline** du jeu et des 2 scripts exécutables du Studio, sans erreur.
- **Test du moteur partagé réel** : un nouveau modèle importé (poids synthétiques contrôlés, configuration de type Studio) produit une **position acheteuse** par l'interface du simulateur. Le test exécute le vrai réseau et le vrai simulateur du Studio, avec un moteur de jeu simulé pour l'exécution.
- **Test d'interface Chromium isolée** : import de fichier `.agent.json`, affichage du robot, absence de sélecteurs génériques, allocation de 25 %, visualisation des TP partiels en lecture seule : OK.
- **Test de synchronisation isolé** : ouverture, réduction de moitié, clôture en réponse à la liste des positions du robot : OK.
- **Test bougie M1 du vrai moteur**, effectué dans les deux pages : une bougie minute avec plus haut 110 ne contamine plus le plus haut de la minute suivante (101) : OK.
- **Contrôle de structure Studio** : la nouvelle configuration de base a `type: base`, `inds: []`, `tech: []`, `adv: false`, `start: zero`, `know: false`, sans TP/SL/trailing auto.

**Non validé comme parcours complet utilisateur :** navigation intégrale dans le jeu après chargement de tous les scripts, import d'un agent entraîné de plusieurs heures, reprise d'une sauvegarde du joueur, ou comportement du robot pendant des années de simulation. La navigation directe des fichiers a été bloquée par l'environnement de Chromium ; les tests Chromium ont donc été exécutés sur une page de test isolant le module robot avec de faux composants du jeu. Des vérifications manuelles sur GitHub Pages restent nécessaires.

**À vérifier avant publication :** charger une sauvegarde réelle, importer un véritable export Studio, laisser plusieurs centaines de minutes de jeu simulées s'écouler, contrôler positions et journal, mettre en pause et reprendre, vérifier la sauvegarde/rechargement, tester un robot à levier supérieur aux cartes débloquées, tester un robot spot et un jeu sur mobile.
