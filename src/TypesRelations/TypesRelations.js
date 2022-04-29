const typeRelations = {
  normal:  {
    doubleDamageFrom: ['fighting'],
    doubleDamageTo: [],
    halfDamageFrom: [],
    halfDamageTo: ["Rock", "Steel"],
    noDamageFrom: ["ghost"],
    noDamageTo: ["ghost"]
  },
  fighting:  {
    doubleDamageFrom: ["flying", "psychic", "fairy"],
    doubleDamageTo: ["normal", "rock", "steel", "ice", "dark"],
    halfDamageFrom: ["rock", "bug", "dark"],
    halfDamageTo: ["flying", "poison", "bug", "psychic", "fairy"],
    noDamageFrom: [],
    noDamageTo: ["ghost"]
  },
  flying: {
    doubleDamageFrom: ["rock", "electric", "ice"],
    doubleDamageTo: ["fighting", "bug", "grass"],
    halfDamageFrom: ["fighting", "bug", "grass"],
    halfDamageTo: ["rock", "steel", "electric"],
    noDamageFrom: ["ground"],
    noDamageTo: []
  },
  poison: {
    doubleDamageFrom: ["ground", "psychic"],
    doubleDamageTo: ["grass", "fairy"],
    halfDamageFrom: ["fighting", "poison", "bug", "grass", "fairy"],
    halfDamageTo: ["poison", "ground", "rock", "ghost"],
    noDamageFrom: [],
    noDamageTo: ["steel"]
  },
  ground: {
    doubleDamageFrom: ["rock", "electric", "ice"],
    doubleDamageTo: ["poison", "rock", "steel", "fire", "electric"],
    halfDamageFrom: ["poison", "rock"],
    halfDamageTo: ["bug", "grass"],
    noDamageFrom: ["electric"],
    noDamageTo: ["flying"]
  },
  rock: {
    doubleDamageFrom: ["fighting", "ground", "steel", "water", "grass"],
    doubleDamageTo: ["flying", "bug", "fire", "ice"],
    halfDamageFrom: ["normal", "flying", "poison", "fire"],
    halfDamageTo: ["fighting", "ground", "steel"],
    noDamageFrom: [],
    noDamageTo: []
  },
  bug: {
    doubleDamageFrom: ["flying", "rock", "fire"],
    doubleDamageTo: ["grass", "psychic", "dark"],
    halfDamageFrom: ["fighting", "ground", "grass"],
    halfDamageTo: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
    noDamageFrom: [],
    noDamageTo: []
  },
  ghost: {
    doubleDamageFrom: ["ghost", "dark"],
    doubleDamageTo: ["ghost", "psychic"],
    halfDamageFrom: ["poison", "bug"],
    halfDamageTo: ["dark"],
    noDamageFrom: ["normal", "fighting"],
    noDamageTo: ["normal"]
  },
  steel: {
    doubleDamageFrom: ["fighting", "ground", "fire"],
    doubleDamageTo: ["rock" ,"ice", "fairy"],
    halfDamageFrom: ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"],
    halfDamageTo: ["steel", "fire", "water", "electric"],
    noDamageFrom: ["poison"],
    noDamageTo: []
  },
  fire: {
    doubleDamageFrom: ["ground", "rock", "water"],
    doubleDamageTo: ["bug", "steel", "grass", "ice"],
    halfDamageFrom: ["bug", "steel", "fire", "grass", "ice", "fairy"],
    halfDamageTo: ["rock", "fire", "water", "dragon"],
    noDamageFrom: [],
    noDamageTo: []
  },
  water: {
    doubleDamageFrom: ["grass", "electric"],
    doubleDamageTo: ["ground", "rock", "fire"],
    halfDamageFrom: ["steel", "fire", "water", "ice"],
    halfDamageTo: ["water", "grass", "dragon"],
    noDamageFrom: [],
    noDamageTo: []
  },
  grass: {
    doubleDamageFrom: ["flying", "poison", "bug", "fire", "ice"],
    doubleDamageTo: ["ground", "rock", "water"],
    halfDamageFrom: ["ground", "water", "grass", "electric"],
    halfDamageTo: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
    noDamageFrom: [],
    noDamageTo: []
  },
  electric: {
    doubleDamageFrom: ["ground"],
    doubleDamageTo: ["flying", "water"],
    halfDamageFrom: ["flying", "steel", "electric"],
    halfDamageTo: ["grass", "electric", "dragon"],
    noDamageFrom: [],
    noDamageTo: ["ground"]
  },
  psychic: {
    doubleDamageFrom: ["bug", "ghost", "dark"],
    doubleDamageTo: ["fighting", "poison"],
    halfDamageFrom: ["fighting", "psychic"],
    halfDamageTo: ["steel", "psychic"],
    noDamageFrom: [],
    noDamageTo: ["dark"]
  },
  ice: {
    doubleDamageFrom: ["fighting", "rock", "steel", "fire"],
    doubleDamageTo: ["flying", "ground", "grass", "dragon"],
    halfDamageFrom: ["ice"],
    halfDamageTo: ["steel", "fire", "water", "ice"],
    noDamageFrom: [],
    noDamageTo: []
  },
  dragon: {
    doubleDamageFrom: ["ice", "dragon", "fairy"],
    doubleDamageTo: ["dragon"],
    halfDamageFrom: ["fire", "water", "grass", "electric"],
    halfDamageTo: ["steel"],
    noDamageFrom: [],
    noDamageTo: ["fairy"]
  },
  dark: {
    doubleDamageFrom: ["fighting", "bug", "fairy"],
    doubleDamageTo: ["ghost", "psychic"],
    halfDamageFrom: ["ghost", "dark"],
    halfDamageTo: ["fighting", "dark", "fairy"],
    noDamageFrom: ["psychic"],
    noDamageTo: []
  },
  fairy: {
    doubleDamageFrom: ["poison", "steel"],
    doubleDamageTo: ["fighting", "dragon", "dark"],
    halfDamageFrom: ["fighting", "bug", "dark"],
    halfDamageTo: ["poison", "steel", "fire"],
    noDamageFrom: ["dragon"],
    noDamageTo: []
  }
}

export default typeRelations