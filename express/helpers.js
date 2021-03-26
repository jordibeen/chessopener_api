function getIdParam(req) {
	const id = req.params.id;
	const idRegex = /^\d+$/;
	if (idRegex.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw new TypeError(`Invalid ':id' param: "${id}"`);
}

function getSlugParam(req) {
	const slug = req.params.slug;
	const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
	if (slugRegex.test(slug)) {
		return String(slug);
	}
	throw new TypeError(`Invalid ':slug' param: "${slug}"`);
}

module.exports = { getIdParam, getSlugParam };
