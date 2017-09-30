const parseToInstance = (Class, list) => list.map(item => item instanceof Class ? item : new Class(item))

export default parseToInstance
