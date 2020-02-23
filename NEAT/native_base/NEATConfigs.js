const NEAT_CONFIGS = {
    // Populations configurations
    total_pop: 200,
    // NEAT configurations
    mutation_rates: {
        add_node: 0.01,
        add_connection: 0.0001,
        shift_weight: 0.2,
        new_weight: 0.05,
        enable_connection: 0.3 
    },
    weight_shift_coeff: 0.01,
    c1: 1,
    c2: 0.5,
    compatibility_threshold: 2.5,
    prune_percentage: 0.5,
    // Genome configs
    input_nodes: 6,
    output_nodes: 2,
};
