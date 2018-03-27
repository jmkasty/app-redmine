package org.jhipster.redmine.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.redmine.domain.UserRedmine;

import org.jhipster.redmine.repository.UserRedmineRepository;
import org.jhipster.redmine.web.rest.errors.BadRequestAlertException;
import org.jhipster.redmine.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserRedmine.
 */
@RestController
@RequestMapping("/api")
public class UserRedmineResource {

    private final Logger log = LoggerFactory.getLogger(UserRedmineResource.class);

    private static final String ENTITY_NAME = "userRedmine";

    private final UserRedmineRepository userRedmineRepository;

    public UserRedmineResource(UserRedmineRepository userRedmineRepository) {
        this.userRedmineRepository = userRedmineRepository;
    }

    /**
     * POST  /user-redmines : Create a new userRedmine.
     *
     * @param userRedmine the userRedmine to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userRedmine, or with status 400 (Bad Request) if the userRedmine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-redmines")
    @Timed
    public ResponseEntity<UserRedmine> createUserRedmine(@RequestBody UserRedmine userRedmine) throws URISyntaxException {
        log.debug("REST request to save UserRedmine : {}", userRedmine);
        if (userRedmine.getId() != null) {
            throw new BadRequestAlertException("A new userRedmine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserRedmine result = userRedmineRepository.save(userRedmine);
        return ResponseEntity.created(new URI("/api/user-redmines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-redmines : Updates an existing userRedmine.
     *
     * @param userRedmine the userRedmine to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userRedmine,
     * or with status 400 (Bad Request) if the userRedmine is not valid,
     * or with status 500 (Internal Server Error) if the userRedmine couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-redmines")
    @Timed
    public ResponseEntity<UserRedmine> updateUserRedmine(@RequestBody UserRedmine userRedmine) throws URISyntaxException {
        log.debug("REST request to update UserRedmine : {}", userRedmine);
        if (userRedmine.getId() == null) {
            return createUserRedmine(userRedmine);
        }
        UserRedmine result = userRedmineRepository.save(userRedmine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userRedmine.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-redmines : get all the userRedmines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userRedmines in body
     */
    @GetMapping("/user-redmines")
    @Timed
    public List<UserRedmine> getAllUserRedmines() {
        log.debug("REST request to get all UserRedmines");
        return userRedmineRepository.findAll();
        }

    /**
     * GET  /user-redmines/:id : get the "id" userRedmine.
     *
     * @param id the id of the userRedmine to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userRedmine, or with status 404 (Not Found)
     */
    @GetMapping("/user-redmines/{id}")
    @Timed
    public ResponseEntity<UserRedmine> getUserRedmine(@PathVariable Long id) {
        log.debug("REST request to get UserRedmine : {}", id);
        UserRedmine userRedmine = userRedmineRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userRedmine));
    }

    /**
     * DELETE  /user-redmines/:id : delete the "id" userRedmine.
     *
     * @param id the id of the userRedmine to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-redmines/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserRedmine(@PathVariable Long id) {
        log.debug("REST request to delete UserRedmine : {}", id);
        userRedmineRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
