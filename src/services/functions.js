function formatDate(dt) {
    const date = new Date(dt);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export { formatDate };
